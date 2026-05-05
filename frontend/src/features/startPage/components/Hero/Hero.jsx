import './Hero.css';
import StartButton from '../../../../components/StartButton/StartButton';
import balloonImg from '../../../../assets/balloons7.jpg';

export default function Hero({link}){
    return(
        <section className='herodiv'>
            <div className='hero_text'>
                <div className='main_title'>A wishlist for your dreams and inspirations</div>
                <div className='subtitle'>Create lists that help you bring your plans to life,
                    save up for what matters, or just keep on dreaming.</div>
            </div>
            <div className='buttons'>
                <StartButton gradient="linear-gradient(153deg,rgb(127, 173, 114) 0%, rgb(151, 207, 158) 50%, rgb(144, 203, 153) 100%)"
                color="#2c2b28"/>
                <a href={link}><button className='work_button'>How it works</button></a>
            </div>
        </section>
    );
}