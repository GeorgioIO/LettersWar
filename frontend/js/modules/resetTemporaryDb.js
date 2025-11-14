export function resetTemporaryDB() {
    fetch("../backend/gameplay/reset_table.php").catch(error => console.log(error));
}