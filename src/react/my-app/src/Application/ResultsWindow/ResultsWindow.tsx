import React from 'react'
import './ResultsWindow.css'
import { CreditsWindow } from './CreditsWindow/CreditsWindow'
import { AvailableWindow } from './AvailableWindow/AvailableWindow';
import { PassedWindow } from './PassedWindow/PassedWindow'

interface ResultsWindowProps {
    renderId: string
}

export class ResultsWindow extends React.Component<ResultsWindowProps> {

    render(): JSX.Element {
        switch (this.props.renderId) {
            case ('available'):
                return (
                    <div className="resultsWindowBox">
                        <AvailableWindow />
                    </div>
                );
            case ('credits'):
                return (
                    <div className="resultsWindowBox">
                        <CreditsWindow />
                    </div>
                );
            case ('passed'):
                return (
                    <div className="resultsWindowBox">
                        <PassedWindow />
                    </div>
                );
            default:
                return (
                    <div className="resultsWindowBox">
                        {this.props.renderId}
                    </div>
                );
        }
    }
}