-- CreateTable
CREATE TABLE "AppointmentTimes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "therapistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateAndTime" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appointmentId" TEXT NOT NULL,

    CONSTRAINT "DateAndTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentTimes" ADD CONSTRAINT "AppointmentTimes_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateAndTime" ADD CONSTRAINT "DateAndTime_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "AppointmentTimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
