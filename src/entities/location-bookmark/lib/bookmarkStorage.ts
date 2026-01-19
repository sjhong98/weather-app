export const getBookmarkList = () => {
    const bookmarkList = localStorage.getItem('locationBookmarkList')
    const parsedBookmarkList = bookmarkList ? JSON.parse(bookmarkList) : []
    return parsedBookmarkList
}

export const setBookmarkList = (bookmarkList: any) => {
    localStorage.setItem('locationBookmarkList', JSON.stringify(bookmarkList))
}