import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onChange, placeholder }) => {
    return (
        <div className="Search">
            <span className="SearchSpan">
                <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
                className="SearchInput"
                type="text"
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
export default SearchBar;