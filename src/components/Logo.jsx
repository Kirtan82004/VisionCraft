import React from "react";
import {Eye} from "lucide-react"

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
          <Eye className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            VisionCraft
          </span>
        </div>
      );
}

export default Logo;