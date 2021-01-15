import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useSelector } from 'react-redux';

interface UserPageProps {
    match: any;
}

// Function Component
export default function UserPageComponent( props: UserPageProps) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const history = useHistory();

    // useEffect(()=>{
    //     let userArr: string[] = [];
    //     let reqArr: any = [];
    //     console.log(props.match.params.id);
    //     userService.getBySupervisor(props.match.params.id).then((arr)=> {
    //         userArr = arr;
    //     })
    //     userArr.forEach((user) => {
    //         requestService.getRequestByName(user).then((reqs) => {
    //             reqArr = reqs;
    //         })
    //     })
    // });
    function goToRequests(){
        history.push('/users/supervisor/requests');
    }

    return (
        <div className='col user card'>
            <nav id='nav'>
                <ul>
                    <button className='link' onClick={goToRequests}>
                        Pending Requests
                    </button>
                </ul>
            </nav>
        </div>
    )
}
