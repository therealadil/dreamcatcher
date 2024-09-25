import Link from 'next/link';
import './LandingPage.css';
// import dreamcatcher from './dreamcatcher.png';
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="LP">
      <h1 className='title'>Welcome to Dreamcatcher</h1>
      <p className='tag'>Capture your dreams and unlock their meanings.</p>
      {/* <Image src='/dreamcatcher.png' alt="Dreamcatcher Icon" width={200} height={200} /> */}
      <Image
                src="/assets/dreamcatcher.jpg"
                alt="Michael and Amanda, Founders"
                width={400}
                height={400}
                loading="lazy"
              />
      <Link href="/sign-in">
        <button>Get Started</button>
      </Link>
    </div>
  );
}