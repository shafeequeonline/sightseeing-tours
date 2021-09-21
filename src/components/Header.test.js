import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({adapter: new Adapter()});

describe('Header Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Header />, div);
    });

    it('should contain the text',  () => {
        const wrapper = shallow(<div className="Header">Cabs | Sightseeing</div>);
        expect(wrapper.text()).toEqual("Cabs | Sightseeing")
    });
})
