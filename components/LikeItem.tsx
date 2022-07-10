import { NextPage } from 'next';
import { storeType } from './Map';

type propsType{
    storeInfo: storeType
}

const LikeItem:NextPage<propsType> = ({ storeInfo }) => {
    return(
        <div className="like-item">
            <span>이미지</span>
            <div className="store-info">
                <span className="name">{storeInfo.name}</span>
                <span className="address">{storeInfo.road_address_name}</span>
            </div>
            <div className="ex-func">
                
            </div>
            <style jsx>
            {`
                .like-item{
                    display:flex;
                }
            `}
            </style>
        </div>
    )
};

export default LikeItem;
