import React, { Component } from "react";

import classes from "./Layout.module.css";
import Header from "../../Components/Header/Header";
import BackDrop from "../../Components/UI/BackDrop/BackDrop";
import SideDrawer from "../../Components/SideDrawer/SideDrawer";
import SideBar from "../../Components/SideBar/SideBar";
import Footer from "../../Components/Footer/Footer";

class Layout extends Component {
    state = {
        backdrop: false
    };

    render() {
        return (
            <div>
                <Header onToggleButton={this.toggleButtonClickHandler} />
                <BackDrop
                    show={this.state.backdrop}
                    onBackDropHandler={this.toggleButtonClickHandler}
                />
                <SideDrawer
                    show={this.state.backdrop}
                    onSideDrawerHandler={this.toggleButtonClickHandler}
                />
                <SideBar show={false} />
                {this.props.children}
                <Footer />
            </div>
        );
    }

    toggleButtonClickHandler = () => {
        this.setState(prevState => {
            return {
                backdrop: !prevState.backdrop
            };
        });
    };
}

export default Layout;
