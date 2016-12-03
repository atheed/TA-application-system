var Radium = require('radium');
var React = require('react');

const styles = {
    container: {
        position: 'relative',
    },
    input: {
        textAlign: 'left',
        width: '15%',
        height: '5%',
        padding: '10px 20px',
        fontFamily: '\'Lato\'',
        fontSize: '15px',
        border: '1px solid #aaa',
        borderRadius: '4px',
        ':focus': {
            outline: 'none',
        },
        '::msClear': {
            display: 'none',
        },
        WebkitAppearance: 'none'
    },
    suggestionsContainer: {
        position: 'relative',
        top: '-1px',
        left: '42.5%',
        width: '15%',
        borderTop: '1px solid #aaa',
        borderRight: '1px solid #aaa',
        borderBottom: '1px solid #aaa',
        borderLeft: '1px solid #aaa',
        backgroundColor: '#fff',
        fontFamily: '\'Lato\'',
        fontSize: '15px',
        textAlign: 'left',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        zIndex: '2'
    },
    suggestionsList: {
        margin: '0',
        padding: '0',
        listStyleType: 'none',
    },
    suggestion: {
        cursor: 'pointer',
        padding: '10px 20px',
        height: '8%',
    },
    suggestionFocused: {
        backgroundColor: '#e6f8ff',
    }
};

export default styles;