import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToLight, changeToDark } = this.props;

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Dashboard" icon="home" route="/dashboard_default" onClick={this.hideSidebar} />
          <SidebarLink
            title="Leads"
            icon="smartphone"
            route="/tables/material_table"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Applicants"
            icon="smartphone"
            route="/tables/material_table"
            onClick={this.hideSidebar}
          />
          <SidebarCategory title="Admin" icon="layers">
            <SidebarLink
              title="Users"
              icon="smartphone"
              route="/users"
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title="Clients"
              icon="smartphone"
              route="/clients"
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
          <SidebarCategory title="Layout" icon="layers">
            <button className="sidebar__link" type="button" onClick={changeToLight}>
              <p className="sidebar__link-title">Light Theme</p>
            </button>
            <button className="sidebar__link" type="button" onClick={changeToDark}>
              <p className="sidebar__link-title">Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/log_in" />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
