import Block from './Block';

export default function renderDOM(block: Block<object>) {
  const root = document.querySelector('#app');
  
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
