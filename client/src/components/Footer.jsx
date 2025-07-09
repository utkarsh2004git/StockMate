import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="bg-gray-900 text-white py-6">
            <div className="container mx-auto text-center">
            <p className="text-sm">© {new Date().getFullYear()} StockMate. All rights reserved.</p>
            <p className="text-xs mt-2">Built with ❤️ by StockMate</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer