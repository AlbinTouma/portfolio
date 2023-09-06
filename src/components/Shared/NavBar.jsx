
export default function NavBar() {

    function NewTab() {
        window.open(
            "https://drive.google.com/file/d/1M9_p6H2y3V5kT96U2cNErJglmGZi--2p/view?usp=sharing", "_blank");
    }

    return (

        <>
            <navbar className='flex flex-row gap-4 justify-end mx-auto pt-4 pr-11 items-center bg-emerald-900'>
                <a href="https://drive.google.com/file/d/1M9_p6H2y3V5kT96U2cNErJglmGZi--2p/view?usp=sharing"
                    target="_blank">
                    <button className="p-2 bg-yellow-300  text-xl rounded-xl">
                        <h1>Resume</h1>
                    </button>
                </a>
            </navbar >
        </>

    )
}
