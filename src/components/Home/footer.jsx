
import { FaLinkedin } from 'react-icons/fa';



export default function FooterSection() {
    return (

        <section className="pt-11 mt-11 bg-slate-100">
            <div className="max-w-[768px] mx-auto flex justify-center">
                <a href="https://linkedin.com/in/albin-touma"
                    target="_blank">
                    <button>
                        <FaLinkedin className='text-6xl' />

                    </button>
                </a>

            </div>


        </section>
    )

}