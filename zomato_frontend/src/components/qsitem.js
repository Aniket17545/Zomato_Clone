import React from "react";
import { useNavigate } from "react-router-dom";

const QsItem = (props) => {

    const { _id, name, content, image } = props.data;

    const nav = useNavigate();

    const ShowFilter = () => {
        nav('./filter', { replace: true })
    }

    return (
        <div onClick={() => ShowFilter(_id)}>
            <div className="d-flex box mt-4" style={{ border: "1px solid greenyellow" }}>
                <div className="l-box">
                    <img src={`./img/${image}`} className="img-fluid img-qs1" alt="" />
                </div>
                <div className="r-box">
                    <h4 className="card-title">{name}</h4>
                    <p className="card-content">{content}</p>
                </div>
            </div>
        </div>
    )
}
export default QsItem;