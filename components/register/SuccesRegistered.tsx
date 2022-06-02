import Link from 'next/link';

export default function SuccesRegistered() {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3em 0em',
        }}
      >
        <h1
          style={{
            fontWeight: '400',
            marginBottom: '2em',
          }}
        >
          Successful registration, Let's login
        </h1>
        <Link href='/'>
          <button
            style={{
              width: '80%',
              fontSize: '1.2rem',
              padding: '0.5em',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              backgroundColor: '#6d6ef6',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            login
          </button>
        </Link>
      </div>
    </>
  );
}
