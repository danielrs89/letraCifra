import { Link } from "react-router-dom"

function Menu() {
    return (
        <div class="position-fixed top-0 start-0 w-100 bg-light shadow-sm z-3">    
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <Link class="nav-link" to="/letra">Letra</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/cifra">Cifra</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu