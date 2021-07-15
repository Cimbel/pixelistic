import React, { Component } from "react";
import { Input } from "@material-ui/core";
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

import httpServise from "../../../../../api/http-service";
import { host, port } from "../../../../../const/node-server-config";
import { updateAvatarUrlPath } from './../../../../utils/avatarUtil';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      showUsers: []
    }
  }

  render() {
    return ( 
      <div>
        <div className="search">
            <Input placeholder="Search" className="search-inp" onFocus={this.getUsers} onChange={this.onChange} onBlur={this.lostFocus} />
              <Scrollbars autoHeight>
              {this.state.showUsers.map( (item, id) => (
              <Link to={`/profile/${item.nickname}`} className="search-item" ref={(el) => {this._item = el}} key = {id}>
                <img src={`${updateAvatarUrlPath(item.avatar)}`} className="avatar" alt="avatar"/> 
                <span className="nickname">{item.nickname}</span>
              </Link>
              ))}
              </Scrollbars>
        </div>
      </div>
    );
  }

  onChange = e => {
    let filter = e.target.value.toUpperCase();
    let users = this.state.users;
    let showUsers = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].nickname.toUpperCase().indexOf(filter) > -1) {
        showUsers = [...showUsers, users[i]];
      }
      if (filter === ''){
        showUsers = [];
      }
    }
    this.setState({showUsers});
  };

  lostFocus = e => {
    e.target.value = "";
    setTimeout(() => {
      this.setState({showUsers: []})
    }, 300);
  }

  getUsers = () => {
    httpServise.post(`${host}:${port}/search`).then(res => {
      this.setState({ users: res.data.users });
    });
  }
}
