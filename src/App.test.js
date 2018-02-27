import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "babel-polyfill";

describe('Application', async () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
    
    test('service availability', async () => {
        const response = await App.checkServiceAvailability();
        expect(response).toEqual(true);
    });
    
    test('receive entries', async () => {
        const response = await App.getEntries();
        expect(response.count).not.toEqual(0);
    });
});