import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Cabs from './components/Cabs/Cabs'
import Search from './components/Search/Search'
import Header from "./components/Header";

configure({adapter: new Adapter()});

describe('App Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App/>);
  })

  it('Should render Header component', () => {
    expect(wrapper.find(<Header />)).toBeTruthy();
  });

  it('Should render Search component', () => {
    expect(wrapper.find(<Search />)).toBeTruthy();
  });

  it('Should render Cabs component', () => {
    expect(wrapper.find(<Cabs />)).toBeTruthy();
  });

})