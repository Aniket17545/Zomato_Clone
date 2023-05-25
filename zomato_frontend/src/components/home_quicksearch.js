import React from "react";
import QsItem from "./qsitem";

class quickSearch extends React.Component {
    render() {
        const { mealtypeData } = this.props;
        return (
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div>
                            <h3 className="heading">Quick Searches</h3>
                            <p className="subheading">Discover restaurants by type of meal</p>
                        </div>
                    </div>

                    {/* First Line */}
                    <div className="d-flex flex-wrap">
                        {mealtypeData.map((e) => {
                            return (
                                <QsItem data={e} />
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default quickSearch;