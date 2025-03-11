

function Menu() {
    return (
        <div>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/letra">Letra</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/cifra">Cifra</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </div>
    )
}

export default Menu