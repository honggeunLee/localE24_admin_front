import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {IPageresponse} from "../../types/ipageresponse.ts";
import {Ievent} from "../../types/ievent.ts";
import {useEffect, useState} from "react";
import {getEventList} from "../../apis/event/eventAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";

const initialState: IPageresponse<Ievent> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    current: 1,
    totalPage: 0
};

function EventManagementListComponent() {
    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageresponse<Ievent>>(initialState);
    const navigate = useNavigate();
    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    useEffect(() => {
        setLoading(true);
        getEventList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [page, size]);

    const moveToRead = (eventNo: number | undefined) => {
        navigate({
            pathname: `/eventManagements/read/${eventNo}`,
            search: `${queryStr}`,
        });
    };

    const ListLI =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((event: Ievent) => {
                const { eventNo, eventName, storeName, makerName, spaceRentStatus, eventStatus } = event;

                return (
                    <li
                        key={eventNo}
                        className="grid grid-cols-5 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => moveToRead(eventNo)}
                    >
                        <span className="text-gray-900 dark:text-gray-300">{eventName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{storeName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{makerName}</span>
                        <span className="text-gray-900 dark:text-gray-300">
                            {spaceRentStatus ? "O" : "X"}</span>
                        <span className="text-gray-900 dark:text-gray-300">
                            {eventStatus === "PENDING" ? "진행전" : eventStatus === "PROGRESSING" ? "진행중" : "종료"}
                            </span>

                    </li>
                );
            })
        ) : (
            <div>데이터가 없습니다.</div>
        );

    return (
        <div className="py-8">
            {loading && <LoadingComponent />}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div
                            className="grid grid-cols-5 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                            <span>이벤트 이름</span>
                            <span>지점명</span>
                            <span>제작자 이름</span>
                            <span>공간 대여 여부</span>
                            <span>이벤트 진행 상태</span>
                        </div>
                        <ul>{ListLI}</ul>
                    </div>
                </div>
            </div>
            <PageComponent pageResponse={pageResponse} />
        </div>
    );
}

export default EventManagementListComponent;