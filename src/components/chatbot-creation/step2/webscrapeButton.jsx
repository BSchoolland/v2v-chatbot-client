// button.jsx

function Button({ children, disabled, className, scraperStatus, spinnerType = 'dots', ...props }) {
    const renderSpinner = () => {
      if (!scraperStatus === 'inProgress') return null;
      
      if (spinnerType === 'circle') {
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
        );
      }
      
      return (
        <div className="loading-dots flex">
          <span className="h-1 w-1 bg-white rounded-full"></span>
          <span className="h-1 w-1 bg-white rounded-full"></span>
          <span className="h-1 w-1 bg-white rounded-full"></span>
        </div>
      );
    };

    return (
      <button 
        className={`text-white justify-center items-center bg-color-dark p-2 my-3 rounded-[12px] cursor-pointer w-[30%] ${
          disabled || scraperStatus === 'inProgress' ? 'opacity-70 cursor-not-allowed' : ''
        } ${className}`}
        style={{ alignSelf: 'flex-end' }}
        disabled={disabled || scraperStatus != 'idle'}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {scraperStatus === 'inProgress' && renderSpinner()}
          {scraperStatus === 'inProgress' ? 'Fetching...' : scraperStatus === 'completed' ? 'Completed' : children}
        </div>
      </button>
    );
  }
  
  export default Button;