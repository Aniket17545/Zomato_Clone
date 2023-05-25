import React from "react";
import Modal from "react-modal";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModal: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    logout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    }

    render() {
        const { loginModal } = this.state;
        const { user } = this.props;
        return (
            <div>
                <nav className="navbar bg-danger" data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>{console.log(user)}
                        {!user ? (
                            <form className="d-flex nav-form">
                                <button type="button" className="btn btn-danger"
                                    onClick={() => this.handleModal("loginModal", true)}>Login</button>
                                <button type="button" className="btn btn-outline-light">Create an account</button>
                            </form>
                        ) : (
                            <form className="d-flex nav-form">
                                <img className="img-thumbnail circle me-3" src={user.photos[0].value}
                                    alt="Avatar" style={{ width: "40px", height: "40px" }} />
                                <a className="text-white p-2">{user.displayName}</a>
                                <button type="button" className="btn btn-danger"
                                    onClick={this.logout}>Logout</button>
                            </form>
                        )

                        }

                    </div>
                </nav>

                <Modal
                    isOpen={loginModal}
                    style={customStyles}
                >
                    <div style={{ float: "right", marginTop: "-21px" }} onClick={() => this.handleModal('galleryModal', false)}><i class="bi bi-x-circle-fill"></i></div>

                    <div className="bg-primary bg-gradient p-3 text-white" onClick={this.google}>
                        <i class="bi bi-google px-3"></i> Google
                    </div>


                </Modal>

            </div>
        )
    }
}

export default Header;