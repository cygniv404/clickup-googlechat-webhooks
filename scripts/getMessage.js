export default (ec) => {
    return {
        header: ec['name'],
        thread: ec['text_content'] ?? null,
        status: ec['status'],
        sender: ec['creator'],
        url: ec['url'],
    }
}