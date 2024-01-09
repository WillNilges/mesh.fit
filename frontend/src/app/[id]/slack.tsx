import EventAvailabilities from '/src/app/[id]/EventAvailabilities'
import Content from '/src/components/Content/Content'

import styles from './page.module.scss'
import { postToSlack } from '/src/config/api';
import Button from '/src/components/Button/Button';

interface SlackButtonProps {
    eventId: string
}
  
const SlackButton = ({ eventId }: SlackButtonProps) => {  
    const sendToSlack = async (eventId: string) => {
        try {
            console.log("Sending to Slack.")
            postToSlack(eventId)
        } catch (e) {
            console.error(e)
        }
    };
    console.log(eventId)
    return <Button onClick={(e:any) => sendToSlack(eventId)}></Button>
    
}

export default SlackButton
