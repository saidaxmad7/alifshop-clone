import Link from "next/link";

function NotFound() {
    return (
        <section className='page404'>
            <div className='container'>
                <div className='page404-row'>
                    <div className='page404-row-img'>
                        <img
                            src='https://alifshop.uz/_ipx/_/images/illustrations/404.svg'
                            alt='404 Not Found'
                        />
                    </div>
                    <div className='page404-row-texts'>
                        <p className="page404-row-title">Balki noto'g'ri manzil ko'rsatilgan</p>
                        <Link href="/" className="page404-row-button">Asosiy ekranga</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
