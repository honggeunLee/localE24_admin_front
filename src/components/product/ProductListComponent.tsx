import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IPageResponse} from "../../types/ipageresponse.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";
import {IProduct} from "../../types/product/product.ts";
import {getProductList} from "../../apis/product/productAPI.ts";

const initialState: IPageResponse<IProduct> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    current: 1,
    totalPage: 0,
};

const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

function ProductListComponent() {
    const [query] = useSearchParams()

    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10

    const [loading, setLoading] = useState<boolean>(false)
    const [pageResponse, setPageResponse] = useState<IPageResponse<IProduct>>(initialState)

    const navigate = useNavigate();

    const queryStr = createSearchParams({page:String(page),size:String(size)})

    const moveToRead = (productNo: number | undefined) => {
        navigate({
            pathname: `/product/read/${productNo}`,
            search:`${queryStr}`
        })
    }

    useEffect(() => {
        setLoading(true)
        getProductList(page, size).then(data => {
            setPageResponse(data)

            setTimeout(() => {
                setLoading(false)
            }, 600)
        })
    }, [page, size])

    const productListLI = pageResponse.dtoList.map((product: IProduct) => {
        const {productNo, categoryNo, productName, regDate } = product

        const formatRegDate = regDate ? formatter.format(new Date(regDate)) : "날짜 없음";

        return (
            <li
                key={productNo}
                className="grid grid-cols-4 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                onClick={() => moveToRead(productNo)}
            >
                <span className="text-gray-900 dark:text-gray-300">{productNo}</span>
                <span className="text-gray-900 dark:text-gray-300">{categoryNo}</span>
                <span className="text-gray-900 dark:text-gray-300">{productName}</span>
                <span className="text-gray-900 dark:text-gray-300">{formatRegDate}</span>
            </li>
        )
    })

    return (
        <div className="py-8">
            {loading && <LoadingComponent></LoadingComponent>}

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div
                            className="grid grid-cols-4 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        >
                            <span>상품코드</span>
                            <span>카테고리 번호</span>
                            <span>상품명</span>
                            <span>신청 날짜</span>
                        </div>
                        <ul>
                            {productListLI}
                        </ul>
                    </div>
                </div>
            </div>


            <PageComponent pageResponse={pageResponse}></PageComponent>
        </div>
    );
}

export default ProductListComponent;