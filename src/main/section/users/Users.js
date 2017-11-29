import React from 'react';
import './users.scss'

export const Users = ({ users, clickHendler, postHendler, posts }) => (
    <div className="section__users-box">
        <button className="section__button"
                onClick={ () => clickHendler() }
        >
            {"get users"}
        </button>
        <div className="section__users-wrap">
        <ul className="section__users-list">
            {users.map(user =>
                <li className="section__users"
                    key={user.id}
                    onClick={ () => postHendler(user.id) }
                >
                    {user.name}
                </li>
            )}
        </ul>
        <div>
            <h3 className="section__users-title">Posts:</h3>
            <ul>
                {posts && posts.map(post =>
                    <li className="section__users-posts"
                        key={post.id}
                    >
                        {post.body}
                    </li>
                )}
            </ul>
        </div>
        </div>
    </div>
);
