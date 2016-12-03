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
    },
    suggestionsContainer: {
        display: 'block',
        position: 'relative',
        top: '2px',
        left: '40.8%',
        width: '18.2%',
        border: '0.2px solid #aaa',
        backgroundColor: '#fff',
        fontFamily: '\'Lato\'',
        fontSize: '15px',
        textAlign: 'left',
        zIndex: '2',
    },
    suggestionsList: {
        margin: '0',
        marginLeft: '20px',
        padding: '0',
        listStyleType: 'none',
    },

    suggestion: {
        cursor: 'pointer',
        height: '8%',
        borderTop: '0.2px solid #aaa',
    },
    suggestionFocused: {
        backgroundColor: '#e6f8ff',
    }
};

export default styles;