import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

const SearchBar = ({ onChange, placeholder }) => {
	const searchInputRef = useRef(null);
	return (
		<div className="searchBar">
			<span className="searchBar__icon" onClick={() => searchInputRef.current.focus()}>
				<FontAwesomeIcon icon={faSearch} />
			</span>
			<input className="searchBar__input" type="text" onChange={onChange} placeholder={placeholder} ref={searchInputRef} />
		</div>
	);
};
export default SearchBar;
