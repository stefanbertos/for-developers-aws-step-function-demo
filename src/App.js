import './App.css';
import {EventCardCollection, EventCreateForm, EventUpdateForm} from './ui-components';
import {Button} from "@aws-amplify/ui-react";
import {useState} from "react";
import {DataStore} from "aws-amplify";

function App() {

    const [collectionVisible, setCollectionVisible] = useState(true);
    const [createVisible, setCreateVisible] = useState(false);
    const [event, setEvent] = useState();

    return (
        <div>
            {(collectionVisible ? (<><Button
                onClick={() => {
                    setCreateVisible(true);
                    setCollectionVisible(false);
                }}
            >Create new Event
            </Button><EventCardCollection overrideItems={({item, index}) => ({
                overrides: {
                    "Start": {
                        defaultValue: item.start
                    },
                    "End": {
                        defaultValue: item.end
                    },
                    "Name": {
                        defaultValue: item.name
                    },
                    "UpdateButton": {
                        onClick: () => {
                            setEvent(item);
                            setCreateVisible(false);
                            setCollectionVisible(false);
                        }
                    },
                    "DeleteButton": {
                        onClick: () => {
                            DataStore.delete(item);
                        }
                    }
                }
            })}/></>) : (createVisible ? (<EventCreateForm onSuccess={() => {
                setCollectionVisible(true);
                setCreateVisible(false)
            }}/>) : (
                <EventUpdateForm event={event} onSuccess={() => {
                    setCollectionVisible(true);
                    setCreateVisible(false)
                }}/>)))}

        </div>
    );
}

export default App;
