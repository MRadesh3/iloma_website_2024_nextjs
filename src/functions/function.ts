export const getLatestItem = (
  items: { status: string; [key: string]: any }[],
  status: string = "Active"
) => {
  const filteredItems = items.filter((item) => item.status === status);

  return filteredItems.length === 1
    ? filteredItems[0]
    : items[items.length - 1];
};


export const getItemsWithCheck = (description: string): string => {
  const parsedHTML = new DOMParser()?.parseFromString(description, "text/html");
  const listItems = parsedHTML?.querySelectorAll("li");

  if (listItems) {
    listItems.forEach((li) => {
      const imgElement: HTMLImageElement = document?.createElement("img"); 
      imgElement.src = "/img/check.png"; 
      imgElement.alt = "Check Icon";
      imgElement.width = 15;
      imgElement.height = 15;
      imgElement.style.marginRight = "10px";
      li.style.margin = "10px 0";
      li.insertBefore(imgElement, li.firstChild);
    });

  
  }

  return parsedHTML.body.innerHTML;
};


export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export function formatDate(dateString: any): string {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getUTCFullYear();
  
  return `${day} ${month} ${year}`;
}

export function getTimeAgo(date: Date | string): string {
  const inputDate = new Date(date);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years === 1 ? "Posted 1 year ago" : `Posted ${years} years ago`;
  if (months > 0) return months === 1 ? "Posted 1 month ago" : `Posted ${months} months ago`;
  if (weeks > 0) return weeks === 1 ? "Posted 1 week ago" : `Posted ${weeks} weeks ago`;
  if (days > 0) return days === 1 ? "Posted 1 day ago" : `Posted ${days} days ago`;
  if (hours > 0) return hours === 1 ? "Posted 1 hour ago" : `Posted ${hours} hours ago`;
  if (minutes > 0) return minutes === 1 ? "Posted 1 minute ago" : `Posted ${minutes} minutes ago`;
  return seconds <= 1 ? "Just now" : `Posted ${seconds} seconds ago`;
}




