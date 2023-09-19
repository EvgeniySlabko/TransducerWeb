import React from "react";
import styles from "./Components.module.scss";

export const CommonInfo = () =>
<>
    <h3 className={styles.align_center}>TransducerWEB(1.0)</h3>
    <p>
        TransducerWEB - аналог программы Transducer работающий в браузере <a target="_blank" href="https://www.google.com/intl/ru/chrome/">Chrome</a>.
        Приложение можно запустить как с <a target="_blank" href="https://tilkom.com/">нашего сайта</a>, так и скачать локальную версию.
    </p>

    <p>
        Поддерживаемые декодеры:
    </p>      
    <ol>
        <li>VCOM (протокол TILKOM);</li>
        <li>RS485;</li>
        <li>T42 USB;</li>
    </ol>

    <p>
        Текущий функционал приложения:
    </p>   
    <ol>
        <li>регистрацию и отображение величин крутящего момента, частоты вращения, температуры ротора, расчет механической мощности;</li>
        <li>отображение данных в цифровом и графическом формате;</li>
        <li>отображение данных с разных датчиков на одном графике;</li>
        <li>запись данных на диск;</li>
        <li>преобразование записанных данных в CSV файл;</li>
        <li>функцию «Тара»;</li>
        <li>одновременную работу с несколькими датчиками;</li>
        <li>фильтр нижних частот;</li>
    </ol>
</>
