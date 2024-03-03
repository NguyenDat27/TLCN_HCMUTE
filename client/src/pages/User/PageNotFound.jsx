import React from 'react';
import svg from '../../assets/pagenotfound/404.svg'
import '../../css/User.css'

const Pagenotfound = () => {
  return (
    <div className='pagenotfound'>
      <div className="cont-404">
          <img src={svg} alt="svg" />
          <button onClick={() => window.location.href = '/'}>Quay lại trang chủ</button>
      </div>
    </div>
  )
}

export default Pagenotfound