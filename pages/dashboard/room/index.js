import { useRouter } from 'next/router'


export default function Room(){
    const router = useRouter();
    const { room } = router.query;
    return(
    <>
    {room}
    </>);
}