import { useEffect, useState } from "react";
import axios from "axios";
import back from "../../assets/img/icons/back.png";
import {useNavigate, useParams} from "react-router-dom";
import {IStore} from "../../types/store/iStore.ts";
import {IEvent} from "../../types/event/iEvent.ts";
import {getStoreDetail} from "../../apis/storeAPI/storeAPI.ts";

function ApplyManagementsEventReadComponent() {
    const navigate = useNavigate();
    const { eventNo } = useParams<{ eventNo: string }>();
    const [event, setEvent] = useState<IEvent | null>(null);

    useEffect(() => {
        const fetchEventDetail = async () => {
            if (eventNo) {
                const response = await getStoreDetail(Number(eventNo));
                setEvent(response);
            }
        };
        fetchEventDetail();
    }, [eventNo]);

    const handleBack = () => {
        navigate(-1);
    };

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <div className="pt-20 pb-10 max-w-lg mx-auto">
            <div className="border rounded-2xl p-10 bg-white shadow-md space-y-6">
                <img
                    src={back}
                    alt="뒤로 가기"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleBack}
                />
                <div>
                    <label className="text-sm font-medium text-gray-700">이벤트명</label>
                    <input
                        type="text"
                        value={event.eventNo}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">제작자</label>
                    <input
                        type="text"
                        value={event.makerName}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">담당 지점</label>
                    <input
                        type="text"
                        value={eventData.storeName}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">공간대여 가능 여부</label>
                    <input
                        type="text"
                        value={eventData.spaceRentalFlag ? "가능" : "불가능"}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">진행기간</label>
                    <div className="flex space-x-2 mt-1">
                        <input
                            type="text"
                            value={eventData.eventStart}
                            readOnly
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="flex items-center">-</span>
                        <input
                            type="text"
                            value={eventData.eventEnd}
                            readOnly
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">신청 날짜</label>
                    <input
                        type="text"
                        value={eventData.requestDate}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <span>상품 리스트</span>
                    {eventData.productList.map((product, index) => (
                        <div key={index}>
                            <label className="text-sm font-medium text-gray-700">{product.name}</label>
                            <img src={product.imageUrl} alt={product.name} className="w-20 h-20 mt-1"/>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 justify-center">
                    <button className="flex-1 max-w-xs px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        승인
                    </button>
                    <button className="flex-1 max-w-xs px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        거절
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyManagementsEventReadComponent;
