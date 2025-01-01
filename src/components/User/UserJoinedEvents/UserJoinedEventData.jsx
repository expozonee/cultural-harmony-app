import { formatIsoDateToYMD } from '../../../utils/utils';

export default function UserJoinedEventData({ data, index, onCheckboxChange }) {
  function handleAddToCalendar(data) {
    if (
      !data.event_title ||
      !data.date ||
      !data.location ||
      !data.event_start_time
    ) {
      console.error('Event details are missing');
      return;
    }

    const startDateFormatted = formatIsoDateToYMD(data.date);
    const startDate = startDateFormatted.replace(/-/g, '');

    const [startHour, startMinute] = data.event_start_time.split(':');
    const startTime = `T${startHour}${startMinute}00`;

    const endHour = String((parseInt(startHour) + 4) % 24).padStart(2, '0');
    const endTime = `T${endHour}${startMinute}00`;

    const details = encodeURIComponent(
      `Event at ${data.event_title} in ${data.location.city_name} 
      The host ${data.event_host_name}, event starts at ${data.event_start_time}.. 
     `
    );
    const location = encodeURIComponent(`${data.location.city_name}`);

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      data.event_title
    )}&dates=${startDate}${startTime}/${startDate}${endTime}&details=${details}&location=${location}&ctz=Asia/Jerusalem&sf=true&output=xml`;

    window.open(googleCalendarUrl, '_blank');
  }

  return (
    <tr>
      <td>
        <input type="checkbox" onChange={() => onCheckboxChange(index)} />
      </td>
      <td>{data.event_title}</td>
      <td>{data.location.city_name}</td>
      <td>{data.date}</td>
      <td>{data.event_host_name}</td>
      <td className="add-to-calender-td">
        <button
          className="add-to-calender"
          onClick={() => handleAddToCalendar(data)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
            id="Capa_1"
            viewBox="0 0 512 512"
            width="30px"
            height="30px"
          >
            <g>
              <path
                id="Path_15_"
                d="m176.539 330.307c-10.072-6.804-17.044-16.741-20.851-29.878l23.377-9.634c2.122 8.084 5.827 14.349 11.116 18.796 5.255 4.446 11.655 6.636 19.133 6.636 7.646 0 14.215-2.324 19.705-6.973 5.491-4.648 8.253-10.577 8.253-17.752 0-7.343-2.897-13.339-8.691-17.987s-13.069-6.973-21.76-6.973h-13.507v-23.141h12.126c7.478 0 13.777-2.021 18.897-6.063s7.68-9.566 7.68-16.606c0-6.265-2.291-11.251-6.872-14.989-4.581-3.739-10.375-5.625-17.415-5.625-6.872 0-12.328 1.819-16.371 5.491-4.042 3.672-6.973 8.185-8.825 13.507l-23.141-9.634c3.065-8.691 8.691-16.371 16.943-23.006 8.253-6.636 18.796-9.971 31.596-9.971 9.465 0 17.987 1.819 25.533 5.491 7.545 3.672 13.474 8.758 17.752 15.225 4.278 6.501 6.4 13.777 6.4 21.861 0 8.253-1.987 15.225-5.962 20.952-3.975 5.726-8.859 10.105-14.653 13.171v1.381c7.646 3.2 13.878 8.084 18.796 14.653 4.884 6.568 7.343 14.417 7.343 23.579s-2.324 17.347-6.973 24.522c-4.648 7.175-11.082 12.834-19.234 16.943-8.185 4.109-17.381 6.198-27.587 6.198-11.823.033-22.736-3.369-32.808-10.174z"
                fill="#0085f7"
              />
              <path
                id="Path_14_"
                d="m320.135 214.299-25.668 18.56-12.833-19.47 46.046-33.212h17.651v156.665h-25.196z"
                fill="#0085f7"
              />
              <path
                id="Path_3_"
                d="m390.737 390.737h-269.474l-38.574 56.837 38.574 64.426h269.474l31.868-68.546z"
                fill="#00a94b"
              />
              <path
                id="Path_4_"
                d="m390.737 0h-350.316c-22.333 0-40.421 18.088-40.421 40.421v350.316l60.632 43.103 60.632-43.103v-269.474h269.474l41.482-60.632z"
                fill="#0085f7"
              />
              <path
                id="Path_5_"
                d="m0 390.737v80.842c0 22.333 18.088 40.421 40.421 40.421h80.842v-121.263z"
                fill="#00802e"
              />
              <path
                id="Path_6_"
                d="m512 121.263-60.632-39.014-60.631 39.014v269.474l54.529 28.463 66.734-28.463z"
                fill="#ffbc00"
              />
              <path
                id="Path_2_"
                d="m512 121.263v-80.842c0-22.333-18.088-40.421-40.421-40.421h-80.842v121.263z"
                fill="#0067d5"
              />
              <path
                id="Path_1_"
                d="m390.737 512 121.263-121.263h-121.263z"
                fill="#ff4131"
              />
            </g>
          </svg>
        </button>
      </td>
    </tr>
  );
}
