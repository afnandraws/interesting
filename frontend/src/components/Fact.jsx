import Image from 'next/image';
import styles from './Fact.module.css'
import copyIcon from '../../public/copyIcon.svg'

const Fact = ({ fact, createdBy, username }) => {
    return (
        <div className={styles.bottombar}>
		<div>
			<div className={styles.fact}>
				<span>{fact}</span>
				<span>{createdBy === username ? 'Me!!' : createdBy}</span>
			</div>
		</div>
		<button onClick={() => {navigator.clipboard.writeText(fact)}}>
			<Image alt="save" src={copyIcon} height={60} />
		</button>
		</div>
    );
}
 
export default Fact;