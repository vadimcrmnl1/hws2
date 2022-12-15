import s from './Loader.module.css'
import preloader from './preloader.svg'

export const Loader = () => <div className={s.loader}><img src={preloader} alt={'preloader'}/> </div>
