"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, Globe, UserPlus, X, CheckCircle2 } from "lucide-react";
import { submitBooking } from "@/app/actions/submitBooking";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm",
  "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm"
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Calendar, 2: Form, 3: Success
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showGuests, setShowGuests] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    notes: "",
    guests: "",
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setShowGuests(false);
      setForm({ name: "", email: "", topic: "", notes: "", guests: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    // Format full date string
    const fullDateString = `${MONTHS[month]} ${selectedDate}, ${year}`;
    
    const result = await submitBooking({
      date: fullDateString,
      time: selectedTime || "",
      ...form
    });

    setIsSubmitting(false);
    if (result.success) {
      setStep(3);
    } else {
      alert("Failed to schedule meeting. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#111111] border border-[#222] rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[600px] text-[#EAEAEA]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#888] hover:text-white bg-[#1A1A1A] rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Panel: Profile Info */}
        <div className="w-full md:w-[320px] bg-[#1A1A1A] p-8 border-b md:border-b-0 md:border-r border-[#222]">
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-12 h-12 mb-4 rounded-full overflow-hidden border border-[#333] bg-[#222]">
                <img 
                  src="/profile.jpg" 
                  alt="Anil Sen" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to the 'A' if the image is missing
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full bg-accent flex items-center justify-center text-true-black font-bold text-xl">A</div>';
                  }}
                />
              </div>
              <p className="text-[#888] font-medium text-sm mb-1">Anil Sen</p>
              <h1 className="text-2xl font-bold text-white mb-6">30 Min Meeting</h1>
              
              {step === 2 && selectedDate && selectedTime && (
                <div className="flex items-start gap-3 text-[#EAEAEA] mb-6 font-medium">
                  <Clock size={18} className="text-[#888] mt-0.5" />
                  <div>
                    <p>{selectedTime}</p>
                    <p className="text-sm text-[#888]">{MONTHS[month]} {selectedDate}, {year}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 text-sm font-medium text-[#CCC]">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#888]" />
                  30m
                </div>
                <div className="flex items-center gap-3">
                  <Video size={18} className="text-[#888]" />
                  Google Meet
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-[#888]" />
                  Asia/Kolkata
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col">
          
          {step === 1 && (
            <div className="flex flex-col md:flex-row flex-1 h-full">
              {/* Middle Panel: Calendar */}
              <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-[#222]">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-bold text-white">
                    {MONTHS[month]} <span className="text-[#888]">{year}</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handlePrevMonth} 
                      disabled={year === new Date().getFullYear() && month === new Date().getMonth()}
                      className={`p-2 rounded-md transition-colors ${year === new Date().getFullYear() && month === new Date().getMonth() ? "opacity-30 cursor-not-allowed" : "hover:bg-[#222]"}`}
                    >
                      <ChevronLeft size={20} className="text-[#888]" />
                    </button>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-[#222] rounded-md transition-colors"><ChevronRight size={20} className="text-[#888]" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-xs font-semibold mb-4 text-[#888]">
                  <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                </div>

                <div className="grid grid-cols-7 gap-y-2 gap-x-2">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = selectedDate === day;
                    
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    const cellDate = new Date(year, month, day);
                    const isPast = cellDate.getTime() < today.getTime();

                    return (
                      <button
                        key={day}
                        disabled={isPast}
                        onClick={() => setSelectedDate(day)}
                        className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                          ${isSelected 
                            ? "bg-white text-black font-bold scale-110 shadow-lg" 
                            : isPast
                              ? "bg-[#111] text-[#444] cursor-not-allowed border border-[#1a1a1a]"
                              : "bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#EAEAEA] border border-[#222]"
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel: Time Slots */}
              <div className="w-full md:w-[280px] p-8 bg-[#111111] overflow-y-auto max-h-[600px]">
                {selectedDate ? (
                  <>
                    <h3 className="font-medium text-white mb-6">
                      {new Date(year, month, selectedDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    </h3>
                    <div className="space-y-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className="w-full py-3 px-4 rounded-md border border-[#333] text-[#EAEAEA] font-medium text-sm hover:border-white hover:text-white transition-colors text-center"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-[#555] text-sm text-center">
                    Select a date to view available time slots
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 p-8 flex flex-col h-full overflow-y-auto max-h-[600px]">
              <div className="max-w-md w-full mx-auto flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Your name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border border-[#333] rounded-md px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border border-[#333] rounded-md px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                {!showGuests ? (
                  <button
                    onClick={() => setShowGuests(true)}
                    className="flex items-center gap-2 text-sm font-medium text-[#EAEAEA] hover:text-white transition-colors py-2"
                  >
                    <UserPlus size={16} /> Add guests
                  </button>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Guest Email(s)</label>
                    <input
                      type="text"
                      placeholder="comma separated"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-transparent border border-[#333] rounded-md px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">What is this meeting about? *</label>
                  <input
                    type="text"
                    required
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full bg-transparent border border-[#333] rounded-md px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Additional notes</label>
                  <textarea
                    rows={4}
                    placeholder="Please share anything that will help prepare for our meeting."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-transparent border border-[#333] rounded-md px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-[#222] flex flex-col sm:flex-row items-center justify-end gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 text-sm font-semibold text-[#EAEAEA] hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isSubmitting || !form.name || !form.email || !form.topic}
                    className="w-full sm:w-auto px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-[#EAEAEA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Confirming..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center h-full">
              <CheckCircle2 size={64} className="text-[#00BA2F] mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Meeting Request Sent!</h2>
              <p className="text-[#888] mb-8 max-w-sm">
                Your request for a meeting on <strong>{MONTHS[month]} {selectedDate}</strong> at <strong>{selectedTime}</strong> has been transmitted successfully.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 border border-[#333] rounded-full text-white font-semibold hover:border-white transition-colors"
              >
                Close Window
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
