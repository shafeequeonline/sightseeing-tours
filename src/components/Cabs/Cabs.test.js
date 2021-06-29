import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SimpleModal from "../SimpleModal/SimpleModal";
import ReactDOM from "react-dom";
import Header from "../Header";
import Cabs from "./Cabs";

configure({adapter: new Adapter()});
describe('Cabs component', () => {

    const MockCabs = [
        {group: 'Premium'},
        {group: 'Business'},
        {group: 'First'},
        {group: 'Business'},
    ]

    let premiumCabsMock, cabsMock;
    beforeEach(() => {
        premiumCabsMock = MockCabs.filter(car => car.group === "Premium")
        cabsMock = MockCabs.filter(car => car.group !== "Premium")
    })

    it('renders without crashing', () => {
        expect(<Cabs/>).toBeTruthy()
    });

    it('should render Cabs', () => {
        const MockCab = {group: 'Premium'}

        const handleClose = () => {
            return false
        };

        const wrapper = shallow(<Modal open={true} onClose={handleClose}><SimpleModal data={MockCab} /></Modal>)
        expect(wrapper.exists()).toBe(true)
    })

    it('should get Premium cabs', () => {
        expect(premiumCabsMock.length).toBe(1)
    });
})