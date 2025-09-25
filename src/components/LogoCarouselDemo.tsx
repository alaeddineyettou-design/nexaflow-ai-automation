import React, { type SVGProps } from "react"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { LogoCarousel } from "@/components/ui/logo-carousel"

// Slack Icon - Official logo scaled properly
function SlackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(128, 128)">
        {/* Slack official logo - properly scaled */}
        
        {/* Top-left yellow */}
        <rect x="-60" y="-18" width="42" height="18" rx="9" fill="#ECB22E" />
        
        {/* Top-right red */}
        <rect x="18" y="-60" width="18" height="42" rx="9" fill="#E01E5A" />
        
        {/* Bottom-right green */}
        <rect x="18" y="18" width="42" height="18" rx="9" fill="#2EB67D" />
        
        {/* Bottom-left blue */}
        <rect x="-36" y="18" width="18" height="42" rx="9" fill="#36C5F0" />
        
        {/* Center vertical red */}
        <rect x="-9" y="-60" width="18" height="42" rx="9" fill="#E01E5A" />
        
        {/* Center vertical green */}
        <rect x="-9" y="18" width="18" height="42" rx="9" fill="#2EB67D" />
        
        {/* Center horizontal yellow */}
        <rect x="-60" y="-9" width="42" height="18" rx="9" fill="#ECB22E" />
        
        {/* Center horizontal blue */}
        <rect x="18" y="-9" width="42" height="18" rx="9" fill="#36C5F0" />
      </g>
    </svg>
  )
}

// Claude AI Icon - Official Anthropic logo from reference
function ClaudeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 512 512"
      width={512}
      height={512}
      {...props}
    >
      <rect fill="#CC9B7A" width={512} height={512} rx={104.187} ry={105.042} />
      <path
        fill="#1F1F1E"
        fillRule="nonzero"
        d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"
      />
    </svg>
  )
}

// Supabase Icon - Official logo from reference
function SupabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 109 113"
      width="109"
      height="113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#a)"
      />
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#b)"
        fillOpacity=".2"
      />
      <path
        d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z"
        fill="#3ECF8E"
      />
      <defs>
        <linearGradient
          id="a"
          x1="53.974"
          y1="54.974"
          x2="94.163"
          y2="71.829"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="36.156"
          y1="30.578"
          x2="54.484"
          y2="65.081"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Gmail Icon - Official Gmail logo without background
function GmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="193"
      viewBox="0 0 256 193"
      {...props}
    >
      {/* Left blue section */}
      <path
        fill="#4285F4"
        d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z"
      />
      
      {/* Right green section */}
      <path
        fill="#34A853"
        d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.504l-31.156 17.837-27.026 25.798v98.911Z"
      />
      
      {/* Center white envelope body */}
      <path
        fill="#FFFFFF"
        d="M58.182 93.14v98.911h139.636V93.14L128 121.74 58.182 93.14Z"
      />
      
      {/* Red envelope flap */}
      <path
        fill="#EA4335"
        d="M197.818 17.504V93.14L128 121.74 58.182 93.14V17.504l69.818 52.24 69.818-52.24Z"
      />
      
      {/* Yellow right corner */}
      <path
        fill="#FBBC04"
        d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z"
      />
      
      {/* Red left corner */}
      <path
        fill="#C5221F"
        d="M0 49.504v-23.273C0 4.646 24.61-7.66 41.89 5.286L58.182 17.504V93.14L0 49.504Z"
      />
    </svg>
  )
}

function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={256}
      height={256}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path
        d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
        fill="#3178C6"
      />
      <path
        d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
        fill="#FFF"
      />
    </svg>
  )
}

function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 228"
      width={256}
      height={228}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path
        d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488C219.644 145.172 256 129.092 256 113.668c0-15.454-17.614-30.328-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86Z"
        fill="#00D8FF"
      />
    </svg>
  )
}

const TailwindIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 54 33"
    {...props}
  >
    <g clipPath="url(#prefix__clip0)">
      <path
        fill="#38bdf8"
        fillRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" d="M0 0h54v32.4H0z" />
      </clipPath>
    </defs>
  </svg>
)

const GitHubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 250"
    width={256}
    height={250}
    fill="#161614"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691.001 128.001.001Z" />
  </svg>
)

const ZapierIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="256" 
    height="256"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Official Zapier logo - orange star/flower shape exactly as in image */}
    <g transform="translate(128, 128)">
      {/* Center circle */}
      <circle cx="0" cy="0" r="20" fill="#FF4A00"/>
      
      {/* Top petal */}
      <ellipse cx="0" cy="-45" rx="15" ry="35" fill="#FF4A00"/>
      
      {/* Bottom petal */}
      <ellipse cx="0" cy="45" rx="15" ry="35" fill="#FF4A00"/>
      
      {/* Right petal */}
      <ellipse cx="45" cy="0" rx="35" ry="15" fill="#FF4A00"/>
      
      {/* Left petal */}
      <ellipse cx="-45" cy="0" rx="35" ry="15" fill="#FF4A00"/>
      
      {/* Top-right diagonal petal */}
      <ellipse cx="32" cy="-32" rx="12" ry="28" fill="#FF4A00" transform="rotate(45 32 -32)"/>
      
      {/* Top-left diagonal petal */}
      <ellipse cx="-32" cy="-32" rx="12" ry="28" fill="#FF4A00" transform="rotate(-45 -32 -32)"/>
      
      {/* Bottom-right diagonal petal */}
      <ellipse cx="32" cy="32" rx="12" ry="28" fill="#FF4A00" transform="rotate(-45 32 32)"/>
      
      {/* Bottom-left diagonal petal */}
      <ellipse cx="-32" cy="32" rx="12" ry="28" fill="#FF4A00" transform="rotate(45 -32 32)"/>
    </g>
  </svg>
)

const OpenAIIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="256"
    height="260"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 260"
    {...props}
  >
    <path
      fill="#10A37F"
      d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"
    />
  </svg>
)

const MongoDBIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="256"
    height="256"
    viewBox="0 0 256 256"
    {...props}
  >
    {/* MongoDB leaf - simple and clear */}
    <g transform="translate(128, 128)">
      <path
        d="M-20 -80 C-35 -70, -40 -40, -35 -10 C-30 20, -20 40, -10 60 C-5 70, 0 75, 5 70 C10 65, 15 50, 20 30 C25 10, 30 -20, 25 -50 C20 -70, 10 -80, -5 -85 C-15 -85, -20 -80, -20 -80 Z"
        fill="#00ED64"
      />
      
      {/* Leaf vein */}
      <path
        d="M-5 -70 C-3 -50, -1 -30, 1 -10 C 3 10, 5 30, 7 50 C 8 60, 9 65, 9 65"
        stroke="#4FA94D"
        strokeWidth="2"
        fill="none"
      />
    </g>
  </svg>
)

// Array of all logos including AI automation services
const allLogos = [
  { name: "OpenAI", id: 1, img: OpenAIIcon },
  { name: "Claude AI", id: 2, img: ClaudeIcon },
  { name: "Supabase", id: 3, img: SupabaseIcon },
  { name: "Slack", id: 4, img: SlackIcon },
  { name: "Gmail", id: 5, img: GmailIcon },
  { name: "TypeScript", id: 6, img: TypeScriptIcon },
  { name: "React", id: 7, img: ReactIcon },
  { name: "Tailwind CSS", id: 8, img: TailwindIcon },
  { name: "GitHub", id: 9, img: GitHubIcon },
  { name: "MongoDB", id: 10, img: MongoDBIcon },
]

export function LogoCarouselDemo() {
  return (
    <div className="space-y-8 py-24 bg-gradient-to-br from-background via-background to-secondary/5 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-red-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-12">
        <div className="text-center space-y-6">
          <GradientHeading variant="secondary" size="sm" className="animate-fade-in">
            Advanced AI Technologies
          </GradientHeading>
          <GradientHeading size="xl" weight="black" className="animate-fade-in">
            Intelligent AI Automation Solutions
          </GradientHeading>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in">
            We deliver cutting-edge automation services powered by the latest artificial intelligence technologies. From data processing to intelligent automation, 
            we help you enhance work efficiency and boost productivity. Customized solutions for all your technical and business needs.
          </p>
        </div>

        <LogoCarousel columnCount={3} logos={allLogos} />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground/80">
            ⚡ Tens of thousands of developers and companies trust these tools
          </p>
        </div>
      </div>
    </div>
  )
}