export default function ThankYouPage() {
  return (
    <div className="h-[calc(100%-75px)] lg:h-[calc(100%-400px)] flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg">Your order has been successfully placed.</p>
      <p className="text-sm text-gray-500 mt-2">
        We appreciate your business and hope you enjoy your purchase.
      </p>
    </div>
  );
}
