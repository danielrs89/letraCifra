import Cifra from './views/Cifra';
import Letra from './views/Letra';

function Menu() {
    return (
        <div>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="src\App">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href={Letra}>Letra</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href={Cifra}>Cifra</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </div>
    )
}

export default Menu