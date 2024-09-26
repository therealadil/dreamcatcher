// import Link from 'next/link';
// import './LandingPage.css';
// // import dreamcatcher from './dreamcatcher.png';
// import Image from 'next/image'

// export default function LandingPage() {
//   return (
//     <div className="LP">
//       <h1 className='title'>Welcome to Dreamcatcher</h1>
//       <p className='tag'>Capture your dreams and unlock their meanings.</p>
//       {/* <Image src='/dreamcatcher.png' alt="Dreamcatcher Icon" width={200} height={200} /> */}
//       <Image
//                 src="/assets/purpledm.png"
//                 alt="DreamCatcher"
//                 width={400}
//                 height={400}
//                 loading="lazy"
//               />
//       <Link href="/sign-in">
//         <button>Get Started</button>
//       </Link>
//     </div>
//   );
// }

import Link from 'next/link';
import './LandingPage.css';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <div className="space stars1"></div>
      <div className="space stars2"></div>
      <div className="space stars3"></div>

      <div className="LP">
        <h1 className="title">Welcome to Dreamcatcher</h1>
        <p className="tag">Capture your dreams and unlock their meanings.</p>

        <Image
          src="/assets/purpledm.png"
          alt="DreamCatcher"
          width={400}
          height={400}
          loading="lazy"
        />
       <Link href="/sign-in" passHref>
            <button>Get Started</button>
        </Link>
 
      </div>
    </>
  );
}