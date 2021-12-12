import { RingLoader } from 'react-spinners'
function LoadingMovieDetails() {
  return (
    <div className="posterholder" style={{ top: '0', left: '0', right: '0', bottom: '0', alignItems: 'center', justifyContent: 'center', position: 'absolute', opacity:'0.5',borderRadius:'0px' }}>
      <RingLoader size={200} color={'white'} speedMultiplier={1.5} />
    </div>
  )
}

export default LoadingMovieDetails
