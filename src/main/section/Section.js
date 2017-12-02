import React, {Component} from 'react';
import './section.scss'

import { Greeting } from "./greeting";
import { Numbers } from "./numbers";
import { Button } from "./button";
import { Locate } from "./locate";
import { Users } from "./users";

const mainTitleText = "Hello, react easycode";
const greetingName = " Sasha";


export class Section extends Component {
    constructor() {
        super();
        this.state = {
            classActive: true,
            buttonClass: "",
            buttonText: "Show",
            latitude: "",
            longitude: "",
            users: [],
            posts: [],
        };
    }

    toggleClass = () => {
        this.setState({
            classActive: !this.state.classActive,
            buttonClass: this.state.classActive ? "active" : "",
            buttonText: this.state.classActive ? "Hide" : "Show",
        });
    };

    showLocate = () => {
        navigator.geolocation.getCurrentPosition( (pos) => {
            this.setState({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            });
        });
    };

    getUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState( {users} ));
    };

    userPost = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => response.json())
            .then(posts => this.setState( {posts} ));
};

    render() {

        const {buttonClass, buttonText, latitude, longitude, users, posts} = this.state;

        return (
            <section className="section">
                <h1 className="section__title">{mainTitleText}</h1>
                <Greeting name={greetingName}/>
                <Numbers
                    from="3"
                    to="7"
                    even
                />
                <Button
                    className={buttonClass}
                    clickHendler={this.toggleClass}
                    buttonText={buttonText}
                />
                <Locate
                    clickHendler={this.showLocate}
                    latitude={latitude}
                    longitude={longitude}
                />
                <Users
                    users={users}
                    clickHendler={this.getUsers}
                    postHendler={this.userPost}
                    posts={posts}
                />
            </section>
        )
    }
}
