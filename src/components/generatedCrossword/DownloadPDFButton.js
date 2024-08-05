import Download from "@/assets/Download";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./GeneratedCrosswordContent.module.css";

export default function DownloadPDFButton(props) {
  const downloadPDF = () => {
    props.setIsButtonClicked(true);
    const input = props.wrapperRef.current;
    const button = props.buttonRef.current;

    // Скрыть кнопку перед созданием PDF
    if (button) button.style.display = "none";

    // Сохранить текущие стили
    const originalStyles = {
      wrapperPadding: input.style.padding,
      crosswordWrapperPadding: input.querySelector(
        `.${styles.crossword_wrapper}`
      ).style.padding,
      questionsWrapperPadding: input.querySelector(
        `.${styles.questions_wrapper}`
      ).style.padding,
    };

    //изменения размера ячеек кроссворда
    const cells = input.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.style.width = `44px`;
      cell.style.height = `44px`;
    });

    // Применить стили для печати
    input.style.padding = "100px";

    // Увеличить размер шрифта всех элементов внутри wrapper в 2 раза
    const originalFontSizes = [];
    const elements = input.querySelectorAll("p, h2, td");
    elements.forEach((element, index) => {
      const style = window.getComputedStyle(element);
      originalFontSizes[index] = style.fontSize;
      element.style.fontSize = `calc(${style.fontSize} * 2)`;
    });

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.5); // Используем JPEG формат и сжатие
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("crossword.pdf");

        // Вернуть исходные стили
        input.style.padding = originalStyles.wrapperPadding;
        input.querySelector(`.${styles.crossword_wrapper}`).style.padding =
          originalStyles.crosswordWrapperPadding;
        input.querySelector(`.${styles.questions_wrapper}`).style.padding =
          originalStyles.questionsWrapperPadding;

        // Вернуть исходные размеры шрифта
        elements.forEach((element, index) => {
          element.style.fontSize = originalFontSizes[index];
        });

        cells.forEach((cell, index) => {
          cell.style.width = "22px";
          cell.style.height = "22px";
        });

        // Показать кнопку снова после генерации PDF
        if (button) button.style.display = "none";
        props.setIsButtonClicked(false);
      })
      .catch((error) => {
        console.error("Ошибка при создании PDF:", error);
        props.setIsButtonClicked(false);
      });
  };
  return (
    <button type="button" className={styles.button} onClick={downloadPDF}>
      <Download />
    </button>
  );
}
