import React from "react";
import { Search, Users } from "lucide-react";

const NoMatchesFound = ({ searchTerm = "", onClearSearch, matchKey = 'matches' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search className="h-10 w-10 text-gray-400" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        No {matchKey} found
      </h2>
      
      {searchTerm && (
        <p className="text-gray-600 mb-6">
          We couldn't find any connections matching{" "}
          <span className="font-medium">"{searchTerm}"</span>. <br />
          Try a different search term.
        </p>
      )}
      
      {searchTerm && (
        <div className="flex flex-col w-full max-w-xs gap-3 mb-6">
          <button
            className="btn btn-outline w-full"
            onClick={onClearSearch}
          >
            Clear Search
          </button>
          <button onClick={onClearSearch} className="btn btn-primary w-full">
            <Users className="h-4 w-4 mr-2" />
            Browse All Connections
          </button>
        </div>
      )}
    </div>
  );
};

export default NoMatchesFound;
